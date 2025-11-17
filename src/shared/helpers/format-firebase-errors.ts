export const formatErrorFromFirebase = (error: any): string => {
    if (!error || typeof error !== 'object') {
        return 'Ocurrió un error inesperado. Por favor, intenta de nuevo.'
    }

    const errorCode = error.code || ''

    const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'Este correo electrónico ya está registrado.\n Intenta iniciar sesión.',
        'auth/invalid-email': 'El correo electrónico no es válido.',
        'auth/operation-not-allowed': 'Operación no permitida. Contacta al administrador.',
        'auth/weak-password': 'La contraseña es muy débil. Debe tener al menos 6 caracteres.',
        'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
        'auth/user-not-found': 'No existe una cuenta con este correo electrónico.',
        'auth/wrong-password': 'Contraseña incorrecta. Por favor, verifica tus credenciales.',
        'auth/invalid-credential': 'Las credenciales proporcionadas son inválidas.',
        'auth/too-many-requests': 'Demasiados intentos fallidos. Por favor, intenta más tarde.',
        'auth/network-request-failed': 'Error de conexión. Verifica tu conexión a internet.',
        'auth/popup-closed-by-user': 'La ventana emergente fue cerrada antes de completar la operación.',
        'auth/requires-recent-login': 'Esta operación requiere que inicies sesión nuevamente.',
        'auth/expired-action-code': 'El código de acción ha expirado.',
        'auth/invalid-action-code': 'El código de acción es inválido.',
        
        'permission-denied': 'No tienes permiso para realizar esta acción.',
        'not-found': 'El documento solicitado no existe.',
        'already-exists': 'El documento ya existe.',
        'resource-exhausted': 'Se ha excedido la cuota de recursos.',
        'failed-precondition': 'La operación no se puede ejecutar en el estado actual.',
        'aborted': 'La operación fue abortada.',
        'out-of-range': 'Valor fuera de rango.',
        'unimplemented': 'Operación no implementada.',
        'internal': 'Error interno del servidor.',
        'unavailable': 'El servicio no está disponible. Intenta más tarde.',
        'data-loss': 'Pérdida de datos irrecuperable.',
        'unauthenticated': 'Debes iniciar sesión para realizar esta acción.',
    }

    return errorMessages[errorCode] || error.message || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.'
}