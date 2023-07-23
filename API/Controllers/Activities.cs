using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Activities;
using System.Reflection.Metadata.Ecma335;

namespace API.Controllers
{
    public class Activities : BaseApiController
    {
    
        [HttpGet] // url: api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // url: api/activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            // Console.Write("GetActivity called");
            return await Mediator.Send(new Details.Query(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return  Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return  Ok(await Mediator.Send(new Edit.Command {Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return  Ok(await Mediator.Send(new Delete.Command {Id = id}));
        }




    }
}