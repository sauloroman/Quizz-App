export const getEnvVariables = (): ImportMetaEnv => {

    import.meta.env

    return {
        ...import.meta.env
    }

}