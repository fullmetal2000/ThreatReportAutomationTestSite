# Create your views here.
import json

from django.http import HttpResponse
from django.template import Context, loader

from rtm.models import Poll
from jsonrpc.proxy import ServiceProxy
import time

import SendCmd
import telnetlib
import RunReport
import GetPerfData

def index(request):
    latest_poll_list = Poll.objects.order_by('-pub_date')[:5]
    template = loader.get_template('rtm/index.html')
    context = Context({
        # 'latest_poll_list': latest_poll_list,
    })
    return HttpResponse(template.render(context))

def test(request):
    template = loader.get_template('rtm/accordion.html')
    context = Context({
        # 'latest_poll_list': latest_poll_list,
    })
    return HttpResponse(template.render(context))
def tab(request):
    template = loader.get_template('rtm/tabs.html')
    context = Context({
        # 'latest_poll_list': latest_poll_list,
    })
    return HttpResponse(template.render(context))

def index1(request):
    #latest_poll_list = Poll.objects.order_by('-pub_date')[:5]
    template = loader.get_template('rtm/111.html')
    context = Context({
      #  'latest_poll_list': latest_poll_list,
    })
    return HttpResponse(template.render(context))

def serve(request, path, document_root, show_indexes=False):
    return True

def chart_list(request):
    faz_ip = request.GET.get('ip','')
    faz_adom = request.GET.get('adom','')
    test = RunReport.RunRTM(faz_ip,faz_adom)
    chartList = test.get_chart_list()
    result = json.dumps(chartList )
    return HttpResponse(result)

def device_list(request):
    faz_ip = request.GET.get('ip','')
    faz_adom = request.GET.get('adom','')
    test = RunReport.RunRTM(faz_ip,faz_adom)
    deviceList = test.getDeviceInfo()
    result = json.dumps(deviceList )
    return HttpResponse(result)

def vdom_list(request):
    faz_ip = request.GET.get('ip','')
    faz_adom = request.GET.get('adom','')
    test = RunReport.RunRTM(faz_ip,faz_adom)
    vdomList = test.getVdomList()
    result = json.dumps(vdomList )
    return HttpResponse(result)

def adom_list(request):
    faz_ip = request.GET.get('ip','')
    faz_adom = request.GET.get('adom','')
    test = RunReport.RunRTM(faz_ip,faz_adom)
    adomList = test.getAdomList()
    result = json.dumps(adomList )
    return HttpResponse(result)

def rtm_chart(request):
    faz_ip = request.GET.get('ip','')
    faz_adom = request.GET.get('adom','')
    test = RunReport.RunRTM(faz_ip,faz_adom)
    chart_name=request.GET.get('chart','')
    state=str(request.GET.get('state',''))
    #use chart name to run rtm report:
    test._RunRTM__devid =  request.GET.get('devid','')
    result_dict = test.run_single_rtm_report(chart_name,state)

    result = json.dumps(result_dict )
    return HttpResponse(result)

def chart_info(request):
    faz_ip = request.GET.get('ip','')
    faz_adom = request.GET.get('adom','')
    test = RunReport.RunRTM(faz_ip,faz_adom)
    chart_name=request.GET.get('chart','')
    #use chart name to run rtm report:
    result_dict = test.get_chart_info(chart_name)
    result = json.dumps(result_dict )
    return HttpResponse(result)


def getSystemStatus(request):
    faz_ip = request.GET.get('ip','')
    faz_username = request.GET.get('username','')
    faz_passwd= request.GET.get('passwd','')
    #cpu or mem or hd or flash disk? give a parameter ?
    test = GetPerfData.GetPerf(faz_ip,faz_username,faz_passwd)
    #use chart name to run rtm report:
    result_dict = test.getSystemStatus()
    result = json.dumps(result_dict )
    return HttpResponse(result)

def getTop(request):
    faz_ip = request.GET.get('ip','')
    faz_username = request.GET.get('username','')
    faz_passwd= request.GET.get('passwd','')
    #cpu or mem or hd or flash disk? give a parameter ?
    test = GetPerfData.GetPerf(faz_ip,faz_username,faz_passwd)
    #use chart name to run rtm report:
    result_dict = test.getTop()
    result = json.dumps(result_dict )
    return HttpResponse(result)


def getFortilogd(request):
    faz_ip = request.GET.get('ip','')
    faz_username = request.GET.get('username','')
    faz_passwd= request.GET.get('passwd','')
    #cpu or mem or hd or flash disk? give a parameter ?
    test = GetPerfData.GetPerf(faz_ip,faz_username,faz_passwd)
    #use chart name to run rtm report:
    result_dict = test.getFortilogd()
    result = json.dumps(result_dict )
    return HttpResponse(result_dict)

def getSqlplugind(request):
    faz_ip = request.GET.get('ip','')
    faz_username = request.GET.get('username','')
    faz_passwd= request.GET.get('passwd','')
    #cpu or mem or hd or flash disk? give a parameter ?
    test = GetPerfData.GetPerf(faz_ip,faz_username,faz_passwd)
    #use chart name to run rtm report:
    result_dict = test.getSqlplugind()
    result = json.dumps(result_dict )
    return HttpResponse(result_dict)


def load_image(request):
    faz_ip = request.GET.get('ip','')
    faz_adom = request.GET.get('adom','')
    test = RunReport.RunRTM(faz_ip,faz_adom)

    build_number=str(request.GET.get('build',''))
    model_type=str(request.GET.get('model','')).upper()
    return_info = ''
    return_info = test.load_image(build_number,model_type)
    result = json.dumps(model_type+' '+build_number )
    return HttpResponse(result+' '+return_info)

def compare(request):
    faz_ip = request.GET.get('ip','')
    faz_adom = request.GET.get('adom','')
    test = RunReport.RunRTM(faz_ip,faz_adom)

    return_info = ''
    return_info = test.do_compare()

    return HttpResponse(return_info)