using Domain; //import Activity
using Microsoft.EntityFrameworkCore;

namespace Persistence;

// need to add DbContext service in Program.cs
public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Activity> Activities { get; set; } // table name in database
}
