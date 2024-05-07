type BaseFormFail<T> = {
    [K in keyof T]: string
}