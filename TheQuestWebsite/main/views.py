from django.shortcuts import render


def map(request):
    return render(request, 'map.html')


def info_center(request):
    return render(request, 'info_center.html')


def profile(request):
    return render(request, 'profile.html')
