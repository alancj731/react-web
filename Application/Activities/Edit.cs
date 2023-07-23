using System.Security;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command: IRequest{
            public Activity Activity {set; get;}
        }
        public class Handeler : IRequestHandler<Command>
        {
            private DataContext _context;
            private IMapper _mapper;
            public Handeler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities.FindAsync(request.Activity.Id);
                
                if (activity != null){
                    
                    _mapper.Map(request.Activity, activity);

                    await _context.SaveChangesAsync();
                }
                
                return Unit.Value;
            }
        }
    }
}