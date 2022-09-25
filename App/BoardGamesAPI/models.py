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
    User_Id = models.ForeignKey(t_user),
    User2_Id = models.ForeignKey(t_user),
    Last_Seen = models.DateField(),

    #class Meta:
    #    constraints = (
    #        ("check_name", Check(proj_name__like!=User_Id)))

    class Meta:
        constraints = [
            # Ensures constraint on DB level, raises IntegrityError (500 on debug=False)
            CheckConstraint(
                check=Q(F('User_ID')!=F('User2_ID')), name='check_same_user_IDs',
            ),
        ]

    def clean(self):
        # Ensures constraint on model level, raises ValidationError
        if self.User_Id == self.User2_Id:
            # raise error for field
            raise ValidationError({'same_ID2': _('user cannot be his own friend.')})

    Constraint fk_user1 FOREIGN KEY(User_Id) References t_user(Id),
    Constraint fk_user2 FOREIGN KEY(User2_Id) References t_user(Id),
    Constraint different_User_Id check (User_Id <> User2_Id),
    Unique (User_Id,User2_Id)