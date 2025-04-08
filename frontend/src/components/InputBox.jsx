export const InputBox = ({label, placeholder, onChange}) => {
    return (
        <div className="p-4">
            <div className="text-sm font-bold text-left py-2 pt-0">
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
        </div>
    )
}