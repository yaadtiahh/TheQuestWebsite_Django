from django.db import models


class Blog(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, verbose_name='Описание')

    background_image = models.ImageField(upload_to='backgrounds_imgs', null=True, verbose_name='Изображение')

    def __str__(self):
        return f'{self.title}, {self.description}'
