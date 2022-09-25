from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import CheckConstraint, Q, F
from django.utils.translation import gettext_lazy as _

# Create your models here.

class t_user(models.Model):
    id = models.BigAutoField(primary_key=True)
    Username = models.CharField(max_length=30,unique=True,null=False, blank=False)
    Mail = models.CharField(max_length=100, unique=True,null=False,blank=False)
    Password= models.CharField(max_length=50,null=False,blank=False)




class  t_friend_list(models.Model):
    User_Id = models.ForeignKey(t_user,on_delete=models.CASCADE),
    User2_Id = models.ForeignKey(t_user, on_delete=models.CASCADE),
    Last_Seen = models.DateField(),

    #class Meta:
    #    constraints = (
    #        ("check_name", Check(proj_name__like!=User_Id)))

    class Meta:
        unique_together = ['User_Id', 'User2_Id']
        constraints = [
            # Ensures constraint on DB level, raises IntegrityError (500 on debug=False)
            models.CheckConstraint(
                check=Q(F('User_ID')!=F('User2_ID')), name='check_same_user_IDs',
            ),

        ]


    #def clean(self): chyba nie jest potrzebne
    #    # Ensures constraint on model level, raises ValidationError
    #    if self.User_Id == self.User2_Id:
    #        # raise error for field
    #        raise ValidationError({'same_ID2': _('user cannot be his own friend.')})

class t_user_activity:
    User_Id=models.ForeignKey(t_user,on_delete=models.CASCADE) ,
    Activity_Type= models.CharField(max_length=30,unique=True,null=False, blank=False),
    Activity_Timestamp =models.DateTimeField(),

