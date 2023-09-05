from django.shortcuts import render
from django import forms
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse
import pickle
import pandas as pd

class PredictForm(forms.Form):
    cement = forms.FloatField(min_value=0, initial=0, label='Cement')
    age = forms.IntegerField(min_value=0, max_value=365, initial=0, label='Curing Period')
    water = forms.FloatField(min_value=0, initial=0, label='Water')
    coarseaggr = forms.FloatField(min_value=0, initial=0, label='Coarse Aggregate')
    fine = forms.FloatField(min_value=0, initial=0, label='Fine Aggregate')
    slag = forms.FloatField(min_value=0, initial=0, label='Blast Furnace Slag')
    ash = forms.FloatField(min_value=0, initial=0, label='Fly Ash')
    superplasticizer = forms.FloatField(min_value=0, initial=0, label='Superplasticizer')
    

# Load saved XGBoost model into web app
with open('xgb.pkl', 'rb') as m:
    MODEL = pickle.load(m)

# Create your views here.
def index(request):
    return render(request, 'concrete/index.html')

def predict_strength(request):
    if request.method == 'POST':

        input_parameters = PredictForm(request.POST)

        if input_parameters.is_valid():
            # Process input parameters for model prediction
            cement = input_parameters.cleaned_data['cement']
            age = input_parameters.cleaned_data['age']
            water = input_parameters.cleaned_data['water']
            slag = input_parameters.cleaned_data['slag']
            ash = input_parameters.cleaned_data['ash']
            coarseaggr = input_parameters.cleaned_data['coarseaggr']
            fine = input_parameters.cleaned_data['fine']
            superplasticizer = input_parameters.cleaned_data['superplasticizer']
    
            data = {
                'cement': [cement],
                'slag' : [slag],
                'ash' : [ash],
                'water' : [water],
                'superplasticizer': [superplasticizer],
                'coarseaggr' : [coarseaggr],
                'fine' : [fine], 
                'age' : [age]
            }

            input_df = pd.DataFrame(data)

            strength = MODEL.predict(input_df)

            return render(request, 'concrete/predict.html', {
                'strength':strength, 'form': PredictForm()
                })
    
    return render(request, 'concrete/predict.html', {
        'form': PredictForm()
    })

