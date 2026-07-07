from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.shortcuts import render, redirect # type: ignore
from message import models
# from django.contrib.auth import authenticate, login, logout

def index(request):
    is_logged_in = 'user_id' in request.session
    if is_logged_in:
        user = models.Users.objects.get(id=request.session['user_id'])
        users = models.Users.objects.exclude(id=user.id)
        return render(request, 'index.html', {
            'is_logged_in': is_logged_in,
            'user': user,
            'users': users
        })
    return redirect('singin')

def singup(request):
    print('asdfasf', request)
    if request.method == 'POST':
        print('hi')
        models.Users.objects.create(
            password = request.POST['password'],
            username = request.POST['username']
        )
        print(request.POST['password'],' and ', request.POST['username'])
    return render(request, 'signup.html')

def singin(request):
    if request.method == 'POST':
        user = models.Users.objects.filter(
                password = request.POST['password'],
                username = request.POST['username']
            ).first()
        if user:
            request.session['user_id'] = user.id
            print('succesful')
        else:
            return redirect('singup')
        return redirect('index')
    return render(request, 'signin.html')


def logout_user(request):
    request.session.flush()
    print('sucessful')
    return redirect('singin')

def message(request, recipient_id):

    current_user = request.session["user_id"]
    recipient = models.Users.objects.get(id=recipient_id)

    messages = models.Message.objects.filter(
        Q(sender_id=current_user, recipient_id=recipient_id) |
        Q(sender_id=recipient_id, recipient_id=current_user)
    ).order_by("created_at")

    if request.method == "POST":
        print(request.POST['message'])
        models.Message.objects.create(
            sender=models.Users.objects.get(id=request.session["user_id"]),
            recipient=recipient,
            message=request.POST["message"],
        )
    context = {
        'messages': messages
    }
    return render(request, 'index.html', context)