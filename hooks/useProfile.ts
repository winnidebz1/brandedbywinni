import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Profile {
    id: string;
    email: string;
    role: 'founder' | 'team_member' | 'accountant';
    full_name: string;
    avatar_url: string;
    last_announcement_view?: string;
}

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function getProfile() {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (user) {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    if (data && mounted) {
                        setProfile(data);
                    }
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        getProfile();

        return () => {
            mounted = false;
        };
    }, []);

    const isAdmin = profile?.role === 'founder';
    const isAccountant = profile?.role === 'accountant';
    const hasFinanceAccess = isAdmin || isAccountant;

    return { profile, loading, isAdmin, isAccountant, hasFinanceAccess };
}
