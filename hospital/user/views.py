from django.shortcuts import render
from django.views import View    
import json
import os
import openpyxl
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Booking,Appointment


class Home(View):
    def get(self, request):
        return render(request,"home.html")

class Bookingpop(View):
    def get(self, request):
        return render(request,"booknow.html")

class ScanView(View):
    def get(self,request):
        return render(request,"scan.html")
    

class FissureView(View):
    def get(self,request):
        return render(request,"fissure.html")
    
class PilesView(View):
    def get(self,request):
        return render(request,"piles.html")
    
class PrivacyView(View):
    def get(self,request):
        return render(request,"privacy&policy.html")    
    
class Term_conditionView(View):
    def get(self,request):
        return render(request,"terms&conditions.html")
    
class AushmanView(View):
    def get(self,request):
        return render(request,"aushman.html")
    
class AboutView(View):
    def get(self,request):
        return render(request,"about.html")
    
class AppendicitisView(View):
    def get(self,request):
        return render(request,"appendicitis.html")    
    
class Fissure_completeView(View):
    def get(self,request):
        return render(request,'fissure_complete.html')
    
class GynecomastiaView(View):
    def get(self,request):
        return render(request,'gynecomastia.html')


class CataractView(View):
    def get(self,request):
        return render(request,"cataract.html")    
    
class CircumcisionView(View):
    def get(self,request):
        return render(request,"circumcision.html")   

class Knee_replacementView(View):
    def get(self,request):
        return render(request,"knee_replacement.html")
    
class Kidney_stoneView(View):
    def get(self,request):
        return render(request,"kidney_stone.html")

class HerniaView(View):
    def get(self,request):
        return render(request,"hernia.html")
class Hip_replacementView(View):
    def get(self,request):
        return render(request,"hip_replacement.html")

class LasikView(View):
    def get(self,request):
        return render(request,"lasik_surgery.html")

class LipomaView(View):
    def get(self,request):
        return render(request,"lipoma.html")

class VaricoceleView(View):
    def get(self,request):
        return render(request,"varicocele.html")
class Varicose_veinView(View):
    def get(self,request):
        return render(request,"varicose_vein.html")
    
class Laboratory_InvestigationView(View):
    def get(self,request):
        return render(request,"Laboratory_Investigation.html")



@method_decorator(csrf_exempt, name='dispatch')
class BookingView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            name = data.get('name')
            phone = data.get('phone_number')
            location = data.get('location')
            treatment = data.get('treatment')

            # Save booking to database
            Booking.objects.create(
                name=name,
                phone_number=phone,
                location=location,
                treatment=treatment
            )

            return JsonResponse({'message': 'Booking saved!'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        


@method_decorator(csrf_exempt, name='dispatch')
class AppointmentView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            name = data.get('name')
            phone = data.get('phone_number')
            email_id = data.get('email_id')

            Appointment.objects.create(
                name=name,
                phone_number=phone,
                email=email_id
            )


            return JsonResponse({'message': 'Booking saved!'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
