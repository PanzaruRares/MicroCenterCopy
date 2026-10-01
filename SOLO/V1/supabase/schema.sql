create table if not exists public.carts (
    user_id uuid primary key references auth.users (id) on delete cascade,
    items jsonb not null default '[]'::jsonb,
    updated_at timestamptz not null default now(),
    constraint carts_items_are_array check (
        case
            when jsonb_typeof(items) = 'array' then jsonb_array_length(items) <= 100
            else false
        end
    )
);

alter table public.carts enable row level security;

revoke all on public.carts from public, anon;
grant select, insert, update on public.carts to authenticated;

drop policy if exists "Users can read their own cart" on public.carts;
create policy "Users can read their own cart"
    on public.carts
    for select
    to authenticated
    using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own cart" on public.carts;
create policy "Users can create their own cart"
    on public.carts
    for insert
    to authenticated
    with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own cart" on public.carts;
create policy "Users can update their own cart"
    on public.carts
    for update
    to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);
