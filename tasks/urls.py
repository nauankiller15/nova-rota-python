from django.urls import path

from . import views

urlpatterns = [
    path('', views.tasksList, name='task-list'),
    path('', views.taskView, name="task-view"),
    path('', views.taskView, name="new-task"),
]
