import json
from curses.ascii import HT
from sqlite3 import DataError, IntegrityError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from . models import *

# Create your views here.

def index(request):
    return render(request, "incidents/index.html")

def login_view(request):
    if request.method == "POST":
        # Sign in user
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check authentication
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "incidents/login.html", {
                "message": "Invalid username and/or password"
            })
    else:
        return render(request, "incidents/login.html")

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = "hi@example.com"
        password = request.POST["password"]
        confirm = request.POST["confirm"]

        if password != confirm:
            return render(request, "incidents/register.html", {
                "message": "Passwords DO NOT match"
            })

        try: 
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "incidents/register.html", {
                "message": "Username already exists"
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "incidents/register.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

# API views

@csrf_exempt
def point(request):
    # Not a POST request send an error
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)

    data = json.loads(request.body)

    latitude = data.get("latitude")
    longitude = data.get("longitude")
    value = data.get("formValue")

    point = Point(latitude = latitude, longitude = longitude, value = value, user = request.user)
    point.save()

    return JsonResponse({"message": "Point recorded"}, status=201)

@csrf_exempt
def send_points(request):
    points = Point.objects.all()
    return JsonResponse([point.serialize() for point in points], safe=False)
