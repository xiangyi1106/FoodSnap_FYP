import React from 'react';
import { SettingsForm } from './SettingsForm';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account</h3>
                <p className="text-sm text-muted-foreground">
                    Update your account settings.
                </p>
            </div>
            <div className="separator" />
            <SettingsForm />
        </div>
    );
}
