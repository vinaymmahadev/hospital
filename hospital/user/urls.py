from django.urls import path
from .views import Home,Bookingpop,ScanView,FissureView,PilesView,BookingView,PrivacyView,Term_conditionView,AushmanView,AboutView,AppendicitisView,Fissure_completeView,GynecomastiaView,CataractView,CircumcisionView,Knee_replacementView,Kidney_stoneView,HerniaView,Hip_replacementView,LasikView,LipomaView,VaricoceleView,Varicose_veinView,AppointmentView,Laboratory_InvestigationView

urlpatterns = [

    path('',Home.as_view(),name='home'),
    path('book_pop/',Bookingpop.as_view(),name='book_pop'),
    path('scan/',ScanView.as_view(),name='scan'),
    path('fissure/',FissureView.as_view(),name='fissure'),
    path('piles/',PilesView.as_view(),name='piles'),
    path('submit-booking/',BookingView.as_view(),name='submit-booking'),
    path('privacyview/',PrivacyView.as_view(),name='privacyview'),
    path('Term_condition/',Term_conditionView.as_view(),name='Term_condition'),
    path('about/',AboutView.as_view(),name='about'),
    path('aushman/',AushmanView.as_view(),name='aushman'),
    path('appendic/',AppendicitisView.as_view(),name='appendic'),
    path('fissure_complete/',Fissure_completeView.as_view(),name='fissure_complete'),
    path('gynecomastia/',GynecomastiaView.as_view(),name='gynecomastia'),
    path('cataract/',CataractView.as_view(),name='cataract'),
    path('circumcision/',CircumcisionView.as_view(),name='circumcision'),
    path('knee_replacement/',Knee_replacementView.as_view(),name='knee_replacement'),
    path('kidney_stone/',Kidney_stoneView.as_view(),name='kidney_stone'),
    path('hernia/',HerniaView.as_view(),name='hernia'),
    path('hip_replacement/',Hip_replacementView.as_view(),name='hip_replacement'),
    path('lasik/',LasikView.as_view(),name='lasik'),
    path('lipoma/',LipomaView.as_view(),name='lipoma'),
    path('varicocele/',VaricoceleView.as_view(),name='varicocele'),
    path('varicose_vein/',Varicose_veinView.as_view(),name='varicose_vein'),
    path('laboratory_investigation/',Laboratory_InvestigationView.as_view(),name='laboratory_Investigation'),


    path('appointment/',AppointmentView.as_view(),name='appointment'),




]
