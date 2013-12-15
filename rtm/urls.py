from django.conf.urls import patterns, include, url

from rtm import views
from mysite import settings

urlpatterns = patterns('',
   #url(r'^index$|^$', views.index, name='rtm/index')
    url(r'^test$', views.index, name='rtm/index'),
    url(r'^$', views.test, name='rtm/test'),
    url(r'^tab$', views.tab, name='rtm/tab'),
    url(r'^id1$', views.index1, name='rtm/index1'),
    url(r'^rtm$', views.rtm_chart, name='rtm/rtm_chart'),
    url(r'^chart_list$', views.chart_list, name='rtm/chart_list'),
    url(r'^device_list$', views.device_list, name='rtm/device_list'),
    url(r'^vdom_list$', views.vdom_list, name='rtm/vdom_list'),
    url(r'^adom_list$', views.adom_list, name='rtm/adom_list'),
    url(r'^chart_info$', views.chart_info, name='rtm/chart_info'),
    url(r'^load_image$', views.load_image, name='rtm/load_image'),
    url(r'^compare$', views.compare, name='rtm/compare'),
   #Below are support of performance test:
    url(r'^getSystemStatus$', views.getSystemStatus, name='rtm/getSystemStatus'),
    url(r'^getTop$', views.getTop, name='rtm/getTop'),
    url(r'^getFortilogd$', views.getFortilogd, name='rtm/getFortilogd'),
    url(r'^getSqlplugind$', views.getSqlplugind, name='rtm/getSqlplugind'),

    url(r'^css_url/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.CURRENT_DIR})
)
