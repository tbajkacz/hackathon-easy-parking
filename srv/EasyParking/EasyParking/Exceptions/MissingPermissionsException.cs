using System;

namespace EasyParking.Exceptions
{
    public class MissingPermissionsException : Exception
    {
        public MissingPermissionsException(int userId, string actionName, Type entityType, object entityId)
            : base($"User {userId} has no permission to perform the action {actionName} on entity type {entityType.Name}, id {entityId}")
        {
        }
    }
}
