using System.Runtime.CompilerServices;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details 
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id;
            public Query(Guid id)
            {
                Id = id;
            }

        }

        public class Handeler : IRequestHandler<Query, Activity>
        {
            private DataContext _context;
            public Handeler(DataContext context)
            {
                _context = context;
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}