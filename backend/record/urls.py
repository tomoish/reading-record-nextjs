from django.urls import path
from . import views

urlpatterns = [
    path('records/', views.getAllRecords, name='records'),
    path('records/new/', views.newRecord, name='new_job'),
    path('records/<str:pk>/', views.getRecord, name='record'),
    path('records/<str:pk>/update/', views.updateRecord, name='update_job'),
    path('records/<str:pk>/delete/', views.deleteRecord, name='delete_job'),
]
