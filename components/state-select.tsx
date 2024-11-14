import { Label } from "@/components/ui/label";

interface StateSelectProps {
    state: string;
    setState: (state: string) => void;
}

export default function StateSelect({ state, setState }: StateSelectProps) {
    const state_abbrevs = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

    const handleStateChange = (e: any) => {
        setState(e.target.value);
    }

    return (
        <>
            <Label htmlFor="state">State</Label>
            <select
                name="state"
                id="state"
                value={state || ""}
                onChange={handleStateChange}
            >
                <option value="" disabled>State</option>
                {state_abbrevs.map((state) => (
                    <option key={state} value={state}>{state}</option>
                ))}
            </select>
        </>
    )
}