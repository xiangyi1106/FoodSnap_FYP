import React from 'react';

export default function PasswordSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">
                    Update your password settings. Set your preferred password.
                </p>
            </div>
            <div className="separator" />
            <button type="button" className="profile_form_button">
                Change Password
            </button>
        </div>
    );
}
