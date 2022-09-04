IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220831195842_db2')
BEGIN
    CREATE TABLE [Users] (
        [UserId] int NOT NULL IDENTITY,
        [FirstName] nvarchar(max) NOT NULL,
        [LastName] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        [UserName] nvarchar(450) NOT NULL,
        [Password] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([UserId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220831195842_db2')
BEGIN
    CREATE TABLE [Plans] (
        [PlanId] int NOT NULL IDENTITY,
        [PlanName] nvarchar(max) NOT NULL,
        [DeviceLimit] int NOT NULL,
        [Price] decimal(18,2) NOT NULL,
        [UserId] int NOT NULL,
        CONSTRAINT [PK_Plans] PRIMARY KEY ([PlanId]),
        CONSTRAINT [FK_Plans_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([UserId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220831195842_db2')
BEGIN
    CREATE TABLE [Devices] (
        [DeviceId] int NOT NULL IDENTITY,
        [DeviceName] nvarchar(max) NOT NULL,
        [PhoneNumber] nvarchar(450) NOT NULL,
        [PlanId] int NOT NULL,
        CONSTRAINT [PK_Devices] PRIMARY KEY ([DeviceId]),
        CONSTRAINT [FK_Devices_Plans_PlanId] FOREIGN KEY ([PlanId]) REFERENCES [Plans] ([PlanId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220831195842_db2')
BEGIN
    CREATE UNIQUE INDEX [IX_Devices_PhoneNumber] ON [Devices] ([PhoneNumber]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220831195842_db2')
BEGIN
    CREATE INDEX [IX_Devices_PlanId] ON [Devices] ([PlanId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220831195842_db2')
BEGIN
    CREATE INDEX [IX_Plans_UserId] ON [Plans] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220831195842_db2')
BEGIN
    CREATE UNIQUE INDEX [IX_Users_UserName] ON [Users] ([UserName]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220831195842_db2')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220831195842_db2', N'6.0.8');
END;
GO

COMMIT;
GO

