# Create your views here.
from django.http import HttpResponse
from django.template import Context, loader

from polls.models import Poll
import json
def index(request):
    latest_poll_list = Poll.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = Context({
        'latest_poll_list': latest_poll_list,
    })
    return HttpResponse(template.render(context))

def index1(request):
    latest_poll_list = Poll.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/111.html')
    context = Context({
        'latest_poll_list': latest_poll_list,
    })
    return HttpResponse(template.render(context))

def page_222(request):
    latest_poll_list = Poll.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/222.html')
    context = Context({
        'latest_poll_list': latest_poll_list,
    })
    #return HttpResponse(template.render(context))
    result = json.dumps({'james':'10', 'luzi':'20'})
    return HttpResponse(result)
