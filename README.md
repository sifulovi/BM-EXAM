# User Portal
>   'Laugh and the world laughs with you, snore and you sleep alone.'

This is very basic .net core webApi project with Angular 7.
To run this project you have need to carefully pass under steps.
###### Project Features are :
 - User Registration
 - User Login
 - List of Users in Dashboard

##### Technology's
- DotNet core(Database-First approach)
 - Angular 7 with Material UI
 - SQL Server
 - JWT 

##### DB Setup  
Firstly run this SQL script in your Microsoft SQL Server Management Studio

```sh
USE [UserPortal ]
GO

/****** Object:  Table [dbo].[TblUser]    Script Date: 8/5/2019 12:57:41 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TblUser](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
	[Address] [varchar](50) NULL,
	[Role] [varchar](50) NULL,
	[Password] [varbinary](128) NULL,
	[Salt] [varbinary](128) NULL,
 CONSTRAINT [PK_TblUser] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
```
#####  Back-end Starter
 1. Open the **webApi** project in your visual studio or any IDE where .net core project can run.
 2. Build The Solution 
 3. Start Without Debugging 

#####  Front-end Starter
 1. Go **userPortal** directory .
 2. Write **npm install** command
 ``` 
nmp install
 ```
 3. Write **ng serve** to run the project.
  ``` 
ng serve
 ```


