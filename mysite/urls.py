from django.conf.urls import patterns, include, url
from mysite import views
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from django.core.urlresolvers import reverse_lazy
from django.views.generic import RedirectView

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    #url(r'^$', 'mysite.views.home', name='home'),
    url(r'^$', RedirectView.as_view(url='rtm')),

    # url(r'^mysite/', include('mysite.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     url(r'^admin/', include(admin.site.urls)),
     url(r'^rtm/', include('rtm.urls')),

)
