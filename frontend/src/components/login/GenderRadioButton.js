export default function GenderRadioButton({setSelectGender}) {
    return (
        <div className="reg_grid mb-2">
            <label htmlFor="male">
                Male
                <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    onChange={(e) => {
                        setSelectGender(e.target.value); // Update the local state
                    }}
                />
            </label>
            <label htmlFor="female">
                Female
                <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    onChange={(e) => {
                        setSelectGender(e.target.value); // Update the local state
                    }}
                />
            </label>
            <label htmlFor="secret">
                Secret
                <input
                    type="radio"
                    name="gender"
                    id="secret"
                    value="secret"
                    onChange={(e) => {
                        setSelectGender(e.target.value); // Update the local state
                    }}
                />
            </label>
        </div>
    )
}
