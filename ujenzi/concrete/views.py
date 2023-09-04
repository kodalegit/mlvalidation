from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request, 'concrete/index.html')
    return HttpResponse("Let's build")
