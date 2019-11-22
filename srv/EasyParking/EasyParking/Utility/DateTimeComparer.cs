using System;

namespace EasyParking.Utility
{
    public static class DateTimeComparer
    {
        public static bool AreOverlapping(DateTime aStart, DateTime aEnd, DateTime bStart, DateTime bEnd)
        {
            return aStart.ToUniversalTime() < bEnd.ToUniversalTime() && bStart.ToUniversalTime() < aEnd.ToUniversalTime();
        }
    }
}
