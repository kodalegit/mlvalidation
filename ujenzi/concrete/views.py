from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.urls import reverse
from .models import User, Predictions
import pickle
import pandas as pd
import json


# Load saved XGBoost model into web app
with open("xgb.pkl", "rb") as m:
    MODEL = pickle.load(m)

# Create your views here.


def index(request):
    return render(request, "concrete/index.html")


def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))

        else:
            return render(
                request,
                "concrete/login.html",
                {"message": "Invalid username and/or password"},
            )

    return render(request, "concrete/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def registration(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(
                request, "concrete/register.html", {"message": "Passwords must match"}
            )

        try:
            user = User.objects.create_user(username, email, password)
            user.save()

        except IntegrityError:
            return render(
                request, "concrete/register.html", {"message": "Username already taken"}
            )

        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    return render(request, "concrete/register.html")


def predict_strength(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            cement = data.get("cement", 0)
            age = data.get("age", 0)
            water = data.get("water", 0)
            slag = data.get("slag", 0)
            ash = data.get("ash", 0)
            coarseaggr = data.get("coarseaggr", 0)
            fine = data.get("fine", 0)
            superplasticizer = data.get("superplasticizer", 0)

            data = {
                "cement": [cement],
                "slag": [slag],
                "ash": [ash],
                "water": [water],
                "superplasticizer": [superplasticizer],
                "coarseaggr": [coarseaggr],
                "fine": [fine],
                "age": [age],
            }

            input_df = pd.DataFrame(data)

            strength = MODEL.predict(input_df)
            float_strength = round(float(strength[0]), 3)

            return JsonResponse({"prediction": float_strength})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return render(request, "concrete/predict.html")


def get_csrf_token(request):
    return JsonResponse({"csrfToken": str(request.COOKIES.get("csrftoken"))})


@login_required
def save_prediction(request):
    if request.method == "POST":
        try:
            content = json.loads(request.body)

            # Update database with new entry
            if content is not None:
                strength = content["strength"]
                description = content["description"]
                new_entry = Predictions(
                    user_id=request.user, prediction=strength, description=description
                )
                new_entry.save()

                # Load all database entries for current user
                user_samples = Predictions.objects.filter(
                    user_id=request.user.id
                ).order_by("-time")
                paginator = Paginator(user_samples, 10)
                page_number = request.GET.get("page")
                page_samples = paginator.get_page(page_number)
                serialized_samples = [sample.serialize() for sample in page_samples]

                return JsonResponse(
                    {
                        "samples": serialized_samples,
                        "total_pages": paginator.num_pages,
                        "message": "Data saved successfully",
                    },
                    status=201,
                )

            return JsonResponse({"error": "Invalid request"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    # Load all database entries for current user
    user_samples = Predictions.objects.filter(user_id=request.user.id).order_by("-date")
    paginator = Paginator(user_samples, 10)
    page_number = request.GET.get("page")
    page_samples = paginator.get_page(page_number)
    serialized_samples = [sample.serialize() for sample in page_samples]

    return JsonResponse(
        {"samples": serialized_samples, "total_pages": paginator.num_pages}
    )


@login_required
def delete_entry(request, sample_id):
    if request.method == "POST":
        sample = Predictions.objects.filter(pk=sample_id, user_id=request.user)
        sample.delete()

        # Load all database entries for current user
        user_samples = Predictions.objects.filter(user_id=request.user.id).order_by(
            "-time"
        )
        paginator = Paginator(user_samples, 10)
        page_number = request.GET.get("page")
        page_samples = paginator.get_page(page_number)
        serialized_samples = [sample.serialize() for sample in page_samples]

        return JsonResponse(
            {
                "samples": serialized_samples,
                "total_pages": paginator.num_pages,
                "message": "Entry successfully deleted",
            }
        )
    return HttpResponseRedirect(reverse("index"))


def documentation(request):
    return render(request, "concrete/documentation.html")
