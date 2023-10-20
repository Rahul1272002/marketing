export const host = "http://localhost:8000"

export const signupRoute = `/api/auth/signup`
export const signinRoute = `/api/auth/signin`
export const signinGoogle = `/api/auth/google`
// export const updateData=`${host}/`
export const updateData = (id) => `/api/user/update/${id}`