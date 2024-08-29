from rest_framework import serializers
from .models import Servicio, TipoServicio, SitioTuristico, Municipio, Departamento, Usuario, Comentario

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class comentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = '__all__'

class departamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'

class municipioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipio
        fields = '__all__'

class sitioTuristicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SitioTuristico
        fields = '__all__'

class tipoServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoServicio
        fields = '__all__'

class servicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'