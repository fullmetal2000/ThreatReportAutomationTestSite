from django.conf.urls import patterns, include, url

from polls import views

urlpatterns = patterns('',
   #url(r'^index$|^$', views.index, name='polls/index')
    url(r'^$', views.index, name='polls/index'),
    url(r'^id1$', views.index1, name='polls/index1'),
    url(r'^222$', views.page_222, name='polls/page_222')

)
