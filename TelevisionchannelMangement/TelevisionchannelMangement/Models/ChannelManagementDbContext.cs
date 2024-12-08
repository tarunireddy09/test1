using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TelevisionchannelMangement.Models;

public partial class ChannelManagementDbContext : DbContext
{
    public ChannelManagementDbContext()
    {
    }

    public ChannelManagementDbContext(DbContextOptions<ChannelManagementDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Advertiesment> Advertisements { get; set; }

    public virtual DbSet<Content> Contents { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Show> Shows { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=DESKTOP-M84CVIT\\SQLEXPRESS;Database=ChannelManagementDb;Integrated Security=True;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Advertiesment>(entity =>
        {
            entity.HasKey(e => e.AdvertisementId).HasName("PK__Advertis__C4C7F4CD9EEF7539");

            entity.Property(e => e.AssignedSubcategory).HasMaxLength(255);
            entity.Property(e => e.ClientName).HasMaxLength(255);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Rate).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Status)
                .HasMaxLength(50);
                
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });


        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE1AAC94C243");

            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        modelBuilder.Entity<Show>(entity =>
        {
            entity.HasKey(e => e.ShowId).HasName("PK__Shows__6DE3E0B29C8B852B");

            entity.Property(e => e.Genre).HasMaxLength(50);
            entity.Property(e => e.Schedule).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(20);
            entity.Property(e => e.Title).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C0164E77B");

            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasMaxLength(60);
            entity.Property(e => e.RoleId).HasMaxLength(50);
            entity.Property(e => e.Username).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
