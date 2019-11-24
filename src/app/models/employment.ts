export interface Employment {
    EmploymentId: number,
    EmployerName: string,
    EmployerImage: string,
    EmployerLocation: string,
    EmploymentTitle: string,
    EmploymentFrom: string,
    EmploymentTo: string,
    EmployerUrl: string,
    Details: string[]
}

export interface Education {
    EducationId: number,
    SchoolName: string,
    Degree: string,
    FromTo: string,
    Activities: string
}