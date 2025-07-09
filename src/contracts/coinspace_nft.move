module coinspace::coinspace_nft {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use std::string::{Self, String};
    use std::vector;

    // Error codes
    const EInvalidPrice: u64 = 1;
    const EInsufficientPayment: u64 = 2;
    const EInvalidCreator: u64 = 3;
    const EDuplicateModule: u64 = 4;

    // Coinspace Module NFT
    struct CoinspaceModule has key, store {
        id: UID,
        module_title: String,
        author_name: String,
        arweave_id: String, // Changed from ipfs_hash to arweave_id
        description: String,
        category: String,
        module_type: String, // "Free" or "Paid"
        price: u64,
        creator: address,
        created_at: u64,
        is_resellable: bool,
    }

    // Module Registry to prevent duplicates
    struct ModuleRegistry has key {
        id: UID,
        registered_arweave_ids: vector<String>, // Changed from ipfs_hashes
    }

    // Events
    struct ModuleMinted has copy, drop {
        module_id: address,
        module_title: String,
        author_name: String,
        arweave_id: String, // Changed from ipfs_hash
        module_type: String,
        price: u64,
        creator: address,
        minter: address,
    }

    struct ModuleTransferred has copy, drop {
        module_id: address,
        from: address,
        to: address,
        price: u64,
    }

    // Initialize module registry
    fun init(ctx: &mut TxContext) {
        let registry = ModuleRegistry {
            id: object::new(ctx),
            registered_arweave_ids: vector::empty(),
        };
        transfer::share_object(registry);
    }

    // Mint free module (only gas fees)
    public entry fun mint_free_module(
        registry: &mut ModuleRegistry,
        module_title: vector<u8>,
        author_name: vector<u8>,
        arweave_id: vector<u8>, // Changed from ipfs_hash
        description: vector<u8>,
        category: vector<u8>,
        ctx: &mut TxContext
    ) {
        let title_str = string::utf8(module_title);
        let author_str = string::utf8(author_name);
        let arweave_str = string::utf8(arweave_id); // Changed variable name
        let desc_str = string::utf8(description);
        let cat_str = string::utf8(category);

        // Check for duplicate Arweave ID
        assert!(!vector::contains(&registry.registered_arweave_ids, &arweave_str), EDuplicateModule);

        // Add Arweave ID to registry
        vector::push_back(&mut registry.registered_arweave_ids, arweave_str);

        let module = CoinspaceModule {
            id: object::new(ctx),
            module_title: title_str,
            author_name: author_str,
            arweave_id: arweave_str, // Changed field name
            description: desc_str,
            category: cat_str,
            module_type: string::utf8(b"Free"),
            price: 0,
            creator: tx_context::sender(ctx),
            created_at: tx_context::epoch(ctx),
            is_resellable: true,
        };

        let module_id = object::uid_to_address(&module.id);
        let sender = tx_context::sender(ctx);

        // Emit event
        event::emit(ModuleMinted {
            module_id,
            module_title: title_str,
            author_name: author_str,
            arweave_id: arweave_str, // Changed field name
            module_type: string::utf8(b"Free"),
            price: 0,
            creator: sender,
            minter: sender,
        });

        // Transfer to minter
        transfer::transfer(module, sender);
    }

    // Mint paid module
    public entry fun mint_paid_module(
        registry: &mut ModuleRegistry,
        module_title: vector<u8>,
        author_name: vector<u8>,
        arweave_id: vector<u8>, // Changed from ipfs_hash
        description: vector<u8>,
        category: vector<u8>,
        payment: Coin<SUI>,
        creator_address: address,
        price: u64,
        ctx: &mut TxContext
    ) {
        let title_str = string::utf8(module_title);
        let author_str = string::utf8(author_name);
        let arweave_str = string::utf8(arweave_id); // Changed variable name
        let desc_str = string::utf8(description);
        let cat_str = string::utf8(category);

        // Validate price
        assert!(price > 0, EInvalidPrice);

        // Validate payment
        let payment_amount = coin::value(&payment);
        assert!(payment_amount >= price, EInsufficientPayment);

        // Check for duplicate Arweave ID
        assert!(!vector::contains(&registry.registered_arweave_ids, &arweave_str), EDuplicateModule);

        // Add Arweave ID to registry
        vector::push_back(&mut registry.registered_arweave_ids, arweave_str);

        // Transfer payment to creator
        transfer::public_transfer(payment, creator_address);

        let module = CoinspaceModule {
            id: object::new(ctx),
            module_title: title_str,
            author_name: author_str,
            arweave_id: arweave_str, // Changed field name
            description: desc_str,
            category: cat_str,
            module_type: string::utf8(b"Paid"),
            price,
            creator: creator_address,
            created_at: tx_context::epoch(ctx),
            is_resellable: true,
        };

        let module_id = object::uid_to_address(&module.id);
        let sender = tx_context::sender(ctx);

        // Emit event
        event::emit(ModuleMinted {
            module_id,
            module_title: title_str,
            author_name: author_str,
            arweave_id: arweave_str, // Changed field name
            module_type: string::utf8(b"Paid"),
            price,
            creator: creator_address,
            minter: sender,
        });

        // Transfer to minter
        transfer::transfer(module, sender);
    }

    // Transfer module (for resale)
    public entry fun transfer_module(
        module: CoinspaceModule,
        payment: Coin<SUI>,
        to: address,
        ctx: &mut TxContext
    ) {
        assert!(module.is_resellable, EInvalidCreator);

        let payment_amount = coin::value(&payment);
        assert!(payment_amount >= module.price, EInsufficientPayment);

        let module_id = object::uid_to_address(&module.id);
        let from = tx_context::sender(ctx);

        // Transfer payment to current owner
        transfer::public_transfer(payment, from);

        // Emit event
        event::emit(ModuleTransferred {
            module_id,
            from,
            to,
            price: payment_amount,
        });

        // Transfer module to new owner
        transfer::transfer(module, to);
    }

    // Get module info (view function)
    public fun get_module_info(module: &CoinspaceModule): (String, String, String, String, String, u64, address) {
        (
            module.module_title,
            module.author_name,
            module.arweave_id, // Changed from ipfs_hash
            module.description,
            module.category,
            module.price,
            module.creator
        )
    }

    // Check if Arweave ID is already registered
    public fun is_arweave_id_registered(registry: &ModuleRegistry, arweave_id: String): bool {
        vector::contains(&registry.registered_arweave_ids, &arweave_id)
    }
}