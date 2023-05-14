import {useRouter} from "next/router";

const AdminPanel = () => {
    const admin = true
    const router = useRouter()

    if (!admin) {
        router.push("/404")
        return null
    }

    return (
        <div>Hui</div>
    )
}

export default AdminPanel