using System;

namespace EasyParking.Utility
{
    public static class DateTimeComparer
    {
        public static bool AreOverlapping(DateTime aStart, DateTime aEnd, DateTime bStart, DateTime bEnd)
        {
            return aStart < bEnd && bStart < aEnd;
        }
    }
}
