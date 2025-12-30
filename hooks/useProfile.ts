import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Profile {
    id: string;
    email: string;
    role: 'founder' | 'team_member';
    full_name: string;
    avatar_url: string;
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
                    } else if (error && mounted) {
                        // If profile doesn't exist, create a default one (temporary fallback)
                        console.warn('Profile not found, creating default...');
                        // Optional: Create profile if missing
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

    return { profile, loading, isAdmin: profile?.role === 'founder' };
}
