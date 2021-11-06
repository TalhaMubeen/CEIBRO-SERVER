
export const getStyleClass = (status: string) => {
        switch(status.toLowerCase()) {
            case 'all':
            return 'all-badge';
            case 'ongoing':
                return 'ongoing-badge';    
            case 'submitted':
                    return 'submitted-badge';
            case 'completed':
                return 'completed-badge';
            case 'rejected':
                return 'rejected-badge';
            case 'done':
                return 'completed-badge';
            case 'approved':
                return 'approved-badge';
            case 'draft':
                return 'draft-badge'
        }
    }
