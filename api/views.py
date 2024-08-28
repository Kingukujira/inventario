from rest_framework import viewsets
from .serializer import userSerializer
from .models import user

# Create your views here.

class userViewSet(viewsets.ModelViewSet):
    queryset = user.objects.all()
    serializer_class = userSerializer