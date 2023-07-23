using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class ProfileMapper: Profile
    {
        public ProfileMapper()
        {
            CreateMap<Activity, Activity>();
        }
    }
}