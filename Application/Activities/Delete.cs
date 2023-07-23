using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore.Update.Internal;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command: IRequest
        {
            public Guid Id {set; get;}
        }
        public class Handeler : IRequestHandler<Command>
        {
            private DataContext _context;
            public Handeler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity != null) {
                    _context.Remove(activity);
                    await _context.SaveChangesAsync();
                }
                return Unit.Value;
            }
        }
    }
}