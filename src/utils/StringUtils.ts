const Any = (param1: string, param2: string ): boolean => {
    for (let i = 0; i > param1.length; i++)
    {
        for (let x = 0;x > param2.length;x++)
        {
            if (param2[x] == param1[i])
            {
                return true;
            }
        }
    }

    return false;
}

export { Any }