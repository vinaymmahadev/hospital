from django.contrib import admin
from django.contrib.admin import AdminSite
from .models import Booking, Appointment
from import_export.admin import ExportMixin
from import_export.resources import ModelResource
from django.template.response import TemplateResponse
from django.utils.translation import gettext as _
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


class CustomAdminSite(AdminSite):
    site_header = "RiteSurgery Administration"
    site_title = "RiteSurgery Admin Portal"
    index_title = "Welcome Admin"

    @method_decorator(login_required)
    def index(self, request, extra_context=None):
        # Copy default implementation but exclude recent actions
        app_list = self.get_app_list(request)
        context = {
            **self.each_context(request),
            'title': self.index_title,
            'app_list': app_list,
            # Do NOT include 'recent_actions'
        }

        if extra_context:
            context.update(extra_context)

        return TemplateResponse(request, self.index_template or 'admin/index.html', context)


custom_admin_site = CustomAdminSite(name='custom_admin')


class AppointmentResource(ModelResource):
    class Meta:
        model = Appointment
        fields = ('name', 'email', 'phone_number')


class AppointmentAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = AppointmentResource
    list_display = ('name', 'email', 'phone_number')

    def has_add_permission(self, request):
        return False


class AppointmentProxy(Appointment):
    class Meta:
        proxy = True
        verbose_name = "Laboratory Investigation / Scan"
        verbose_name_plural = "Laboratory Investigation / Scan"


custom_admin_site.register(AppointmentProxy, AppointmentAdmin)


class BookingResource(ModelResource):
    class Meta:
        model = Booking
        fields = ('name', 'phone_number', 'location', 'treatment')


class BookingAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = BookingResource
    list_display = ('name', 'phone_number', 'location', 'treatment')
from django.utils.safestring import mark_safe
from django.urls import reverse


class CustomAdminSite(AdminSite):
    site_header = "RiteSurgery Administration"
    site_title = "RiteSurgery Admin Portal"
    index_title = "Welcome Admin"

    @method_decorator(login_required)
    def index(self, request, extra_context=None):
        app_list = self.get_app_list(request)

        # Render basic HTML manually without template
        app_list_html = "<h2>Available Apps</h2><ul>"
        for app in app_list:
            app_list_html += f"<li><strong>{app['name']}</strong><ul>"
            for model in app['models']:
                app_list_html += (
                    f"<li><a href='{model['admin_url']}'>{model['name']}</a></li>"
                )
            app_list_html += "</ul></li>"
        app_list_html += "</ul>"

        html = f"""
        <html>
        <head>
            <title>{self.site_title}</title>
        </head>
        <body>
            <h1>{self.index_title}</h1>
            <p>{self.site_header}</p>
            {app_list_html}
        </body>
        </html>
        """

        return TemplateResponse(request, template=None, context={"content": mark_safe(html)}, content_type='text/html')

    def has_add_permission(self, request):
        return False


custom_admin_site.register(Booking, BookingAdmin)
