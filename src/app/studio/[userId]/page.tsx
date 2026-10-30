
interface Props {

    params: Promise<{userId: string}>
}

export default async function StudioPage({params}: Props) {

    const userId = await params;

    return (
        <>
            {JSON.stringify(userId, null, 2)}
        </>
    )
}