create table t_user(
    Id int generated always as identity Primary key,
    Username Varchar(50) Constraint Username_Must_Be_Uniqe UNIQUE not null,
    Mail Varchar(100) Constraint Email_Must_Be_Uniqe UNIQUE not null,
    Password Varchar(50) not null
);

create table t_friend_list(
    User_Id int,
    User2_Id int,
    Last_Seen date,
    Constraint fk_user1 FOREIGN KEY(User_Id) References t_user(Id),
    Constraint fk_user2 FOREIGN KEY(User2_Id) References t_user(Id),
    Constraint different_User_Id check (User_Id <> User2_Id),
    Unique (User_Id,User2_Id)
);

create table t_user_activity(
    User_Id int,
    Activity_Type Varchar(100),
    Activity_Timestamp timestamp,
    Constraint Activity_User_Id Foreign key(User_Id) References t_user(Id)
);

create table t_genre(
    Id int generated always as identity Primary key,
    Name varchar(70) Not Null
);

create table t_game(
    Id int generated always as identity primary key,
    Name varchar(255) not null,
    Release_Year int,
    Designer Varchar(255) not null,
    Publisher Varchar(255) not null,
    Age int,
    Min_Players int,
    Max_Players int,
    Avg_Time int,
    Game_Weight float not null
);

create table t_game_genre(
    Game_Id int,
    Genre_Id int,
    Constraint Game_Id_For_Genre Foreign key (Game_Id) References t_game(Id),
    Constraint Genre_Id_For_Genre Foreign key (Genre_Id) References t_genre(Id),
    Unique (Game_Id, Genre_Id)
);

create table t_review(
    Game_Id int,
    User_Id int,
    Review_Mark float not null,
    Description Varchar(1000),
    Constraint Game_Id_For_Review Foreign key (Game_Id) References t_game(Id),
    Constraint User_Id_For_Review Foreign key (User_Id) References t_user(Id),
    Constraint Must_Be_Positive check (Review_Mark >= 0),
    Unique (Game_Id,User_Id)
);

create table t_user_game(
    User_Id int,
    Game_Id int,
    Constraint User_Id_For_User_Game foreign key (User_Id) references t_user(Id),
    Constraint Game_Id_For_User_Game foreign key (Game_Id) references t_game(Id),
    Unique(User_Id,Game_Id)
)