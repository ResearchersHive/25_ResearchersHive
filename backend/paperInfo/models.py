from django.db import models

class PaperInfo(models.Model):
    paperId = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    abstract = models.TextField()
    keywords = models.CharField(max_length=255, default="")
    paperPdf = models.CharField(max_length=255, default="")
    year = models.PositiveIntegerField()
    authors = models.CharField(max_length=511)
    venue = models.CharField(max_length=255)
    venue_type = models.CharField(max_length=50, choices=[('conference', 'Conference'), ('journal', 'Journal')])
    venue_link = models.URLField()

    def __str__(self):
        return self.title