__author__ = 'jamescheng'
from django.http import HttpResponse
from django.template import Context, loader

def index(request):

    template = loader.get_template('index.html')
    context = Context({
        # 'latest_poll_list': latest_poll_list,
    })
    return HttpResponse(template.render(context))