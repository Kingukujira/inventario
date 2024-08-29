from rest_framework import viewsets
from .serializer import userSerializer
from .models import Usuario, Comentario, Departamento, Municipio, SitioTuristico, TipoServicio, Servicio

# Create your views here.

class userViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = userSerializer

class comentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = userSerializer

class departamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = userSerializer

class municipioViewSet(viewsets.ModelViewSet):
    queryset = Municipio.objects.all()
    serializer_class = userSerializer

class sitioTuristicoViewSet(viewsets.ModelViewSet):
    queryset = SitioTuristico.objects.all()
    serializer_class = userSerializer

class tipoServicioViewSet(viewsets.ModelViewSet):
    queryset = TipoServicio.objects.all()
    serializer_class = userSerializer

class servicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = userSerializer